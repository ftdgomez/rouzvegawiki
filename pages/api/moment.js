import dbConnect from '../../lib/connectMongo'
import Moment from '../../models/Moment'

async function getAllMoments(req){
    const { page = 1, limit = 12 } = req.query
    const moments = await Moment.find({}).skip(page * limit).limit(limit)
    return moments
}

async function createMoment(req){
    const { title, body, picture, thumbnail, user, date, clip } = req.body
    if (!title || !body || !picture || !thumbnail || !user || !date) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(req.body)
        }
        throw new Error('Missing parameters')
    }
    const moment = new Moment({
        title,
        body,
        picture,
        thumbnail,
        clip,
        user: {
            name: user.name,
            email: user.email,
            image: user.image
        },
        date
    })
    await moment.save()
    return moment
}

async function updateMoment(req){
    const { id } = req.params
    const { title, body, picture, thumbnail, user, date } = req.body
    if (!title || !body || !picture || !thumbnail || !user || !date) {
        throw new Error('Missing parameters')
    }
    const moment = await Moment.findByIdAndUpdate(id, {
        title,
        body,
        picture,
        thumbnail,
        user: {
            name: user.name,
            email: user.email,
            image: user.image
        },
        date
    }, { new: true })
    return moment
}

export default async (req, res) => {
    const method = req.method

    try {
        await dbConnect()

        if (method === 'GET') {
            return res.json({
                data: await getAllMoments(req),
                status: 200,
                success: true,
                message: 'Moments retrieved successfully'
            })
        }

        if (method === 'POST') {
            return res.status(201).json({
                data: await createMoment(req),
                status: 200,
                success: true,
                message: 'Moment created successfully'
            })
        }

        if (method === 'PUT') {
            return res.json({
                data: await updateMoment(req),
                status: 200,
                success: true,
                message: 'Moment updated successfully'
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