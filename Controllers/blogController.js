const Blog = require('../Models/Blog');

const handleAddBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        const image = `/uploads/blog/${req.file.filename}`;
        const blog = await Blog.create({
            title, image, body, createdBy: req.user._id
        })
        return res.redirect('/')

    }
    catch (error) {
        return res.render('/blog/addBlog', { error })
    }
}

module.exports = { handleAddBlog }