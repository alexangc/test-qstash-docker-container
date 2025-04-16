import "dotenv/config";
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN });
async function main() {
  const res = await client.publishJSON({
    url: process.env.API_URL!,
    body: { hello: "world" },
    // headers: { "my-header": "my-value" },
  });

  console.log("res", res);
}

main();
