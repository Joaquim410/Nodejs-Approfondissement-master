const Article = require('./articles.model');

class ArticleService {
    createArticle(data, userId) {
        const article = new Article({ ...data, user: userId });
        return article.save();
    }

    updateArticle(articleId, data, userId) {
        return Article.findOneAndUpdate({ _id: articleId, user: userId }, data, { new: true });
    }

    deleteArticle(articleId, userId) {
        return Article.findOneAndDelete({ _id: articleId, user: userId });
    }
}

module.exports = new ArticleService();