exports.get404 = (req, res, next) => { // any other url 
    res.status(404).render('404', {pageTitle: 'Page Not Found'}) 
}