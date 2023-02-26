import "dotenv/config";

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL

const SECRET = process.env.SECRET || "SECRET";

export default {
    PORT,
    MONGODB_URL,
    SECRET
};