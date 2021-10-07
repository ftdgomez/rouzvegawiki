import dbConnect from '../../lib/connectMongo'
import Model from '../../models/Character'

async function getAllDocs(req){
    const { page = 1, limit = 12 } = req.query
    const docs = await Model.find({}).skip(page * limit).limit(limit)
    return docs
}

async function createDoc(req){
    const {  name, description, user, date, clip, image, thumbnail } = req.body
    if (!name || !description || !user || !date) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(req.body)
        }
        throw new Error('Missing parameters')
    }
    const doc = new Model({
        name,
        description,
        image,
        thumbnail,
        clip,
        user: {
            name: user.name,
            email: user.email,
            image: user.image
        },
        date
    })
    await doc.save()
    return doc
}

async function updateDoc(req){
    // const { id } = req.params
    // const { quote, user, date } = req.body
    // if (!quote || !user || !date) {
    //     throw new Error('Missing parameters')
    // }
    // const doc = await Model.findByIdAndUpdate(id, {
    //     quote,
    //     user: {
    //         name: user.name,
    //         email: user.email,
    //         image: user.image
    //     },
    //     date
    // }, { new: true })
    // return doc
    return {}
}

export default async (req, res) => {
    const method = req.method

    try {
        await dbConnect()

        if (method === 'GET') {
            return res.json({
                data: await getAllDocs(req),
                status: 200,
                success: true,
                message: 'Docs retrieved successfully'
            })
        }

        if (method === 'POST') {
            return res.status(201).json({
                data: await createDoc(req),
                status: 200,
                success: true,
                message: 'Doc created successfully'
            })
        }

        if (method === 'PUT') {
            return res.json({
                data: await updateDoc(req),
                status: 200,
                success: true,
                message: 'Doc updated successfully'
            })
        }

        return res.status(405).json({
            message: 'Method Not Allowed',
            success: false
        })

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log(error)
        }
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}