const Tour = require("../model/Tour")




exports.getall = async (req, res) => {

    // const queryObjforSearch = { ...req.query }

    // const excludeFields = ['sort', 'page', 'limit']

    // // console.log(req.query)
    // excludeFields.forEach(val => delete queryObjforSearch[val])

    // // console.log(queryObjforSearch);

    // let queryString = JSON.stringify(queryObjforSearch)
    // // console.log(queryString)

    // queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

    // // console.log(queryString)


    //                    ============   sorting =============

    const queryObj = { ...req.query }
    const removeFields = ['sort', 'page', 'limit', 'fields']

    removeFields.forEach(val => delete queryObj[val])

    // console.log(req.query);
    // console.log(queryObj)
    let queries = {}
    if (req.query.sort) {
        const sortby = req.query.sort.split(',').join(' ')
        queries.sortby = sortby
        // console.log(sortby);
    }



    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queries.fields = fields
        console.log(fields);
    }







    //  pagination 

    if (req.query.page) {
        const { page = 1, limit = 2 } = req.query

        const skip = (page - 1) * (limit * 1)

        queries.skip = skip
        queries.limit = parseInt(limit)
    }



    try {
        const tour = await Tour.find({}).skip(queries.skip).limit(queries.limit).select(queries.fields).sort(queries.sortby)
        // const bootcamp = await BootCamp.find(JSON.parse(queryString)).sort(queries.sortby)
        const totalProducts = await Tour.countDocuments(queryObj)
        // const toalPage = Math.ceil(totalProducts / queries.limit)
        // console.log(toalPage);
        res.send({ totalProducts, tour })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// create tour 



exports.createTour = async (req, res) => {
    try {

        const tour = await Tour.create(req.body)
        res.status(200).json({
            success: true,
            message: 'data added'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//  get a single tour info 


exports.singleTour = async (req, res) => {
    try {
        let tour = await Tour.findById(req.params.id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}







// update tour 




exports.updateTour = async (req, res, next) => {
    try {
        let tour = await Tour.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true })
        res.status(201).json({
            success: true,
            message: 'item updated'
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


}



// cheapest

exports.cheap = async (req, res) => {
    try {
        const tour = await Tour.find({}).sort({ price: 1 }).limit(3)
        res.send(tour)

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

