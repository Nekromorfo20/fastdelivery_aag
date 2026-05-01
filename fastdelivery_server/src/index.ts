import colors from "colors";
import server from "./server";

const port = process.env.PORT;

server.listen(port, () => {
    console.log(colors.cyan.bold(`Proyecto ejecutandose en http://localhost:${port}`));
})
