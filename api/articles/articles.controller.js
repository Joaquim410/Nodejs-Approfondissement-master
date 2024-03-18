const ArticleService = require('./articles.service');

class ArticlesController {
    async create(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const article = await ArticleService.createArticle(req.body, req.user._id);
        res.status(201).json(article);
    }

    async update(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const updatedArticle = await ArticleService.updateArticle(req.params.id, req.body, req.user._id);
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found or user not authorized to update" });
        }
        res.json(updatedArticle);
    }

    async delete(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const result = await ArticleService.deleteArticle(req.params.id, req.user._id);
        if (!result) {
            return res.status(404).json({ message: "Article not found or user not authorized to delete" });
        }
        res.status(204).send();
    }
}

module.exports = new ArticlesController();