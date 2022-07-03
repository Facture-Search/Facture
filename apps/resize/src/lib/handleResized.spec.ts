import { handleResized } from "./handleResized";
import { s3 } from "./mocks/s3";

describe("handle resized", () => {
    it("should handle a file with no size param", async () => {
        const out = await handleResized("hello.png", "", s3 as any);

        expect(out.statusCode).toEqual(200);
        expect(out.headers["Content-Type"]).toEqual("application/png");
        expect(out.headers["Content-Disposition"]).toEqual("attachment; filename=hello.png");
        expect(out.body).toEqual("No size");
        expect(out.isBase64Encoded).toEqual(true);
    });
});
