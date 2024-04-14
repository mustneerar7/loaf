const logger = (req, res, next) => {
    const time = new Date();
    console.log(`${time.toISOString()}\t[${req.method}]\t${req.url}`);

    next();
}

module.exports = logger;