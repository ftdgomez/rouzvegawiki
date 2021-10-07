import dbConnect from '../../lib/connectMongo'
import Moment from '../../models/Moment'
import Character from '../../models/Character'
import Dictionary from '../../models/Dictionary'
import Quote from '../../models/Quote'


async function handler(req, res){
    const method = req.method
    try {
    await dbConnect()
    if (method === 'GET'){
        const moments = await Moment.find({}).limit(12)
        const quotes = await Quote.find({}).limit(12)
        const characters = await Character.find({}).limit(4)
        const words = await Dictionary.find({}).limit(4)
        const data = {
            posts: [
                ...moments.map(moment => ({...moment._doc, type: 'moment'})), 
                ...quotes.map(quote => ({...quote._doc, type: 'quote'}))
            ].sort((a, b) => b.createdAt - a.createdAt),
            characters,
            words
        }
        return res.status(200).json({
            success: true,
            status: 200,
            data: data
        })
    }
    return res.status(405).json({
        status: 405,
        message: 'Method not allowed'
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export default handler