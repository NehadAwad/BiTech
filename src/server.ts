import app from "./app";
import logger from "./util/winston";

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`server is listening on ${port}`)
})