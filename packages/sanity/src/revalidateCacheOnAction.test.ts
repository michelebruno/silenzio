import type { DocumentActionComponent, DocumentActionsContext } from "sanity";
import revalidateCacheOnAction from "./revalidateCacheOnAction";

import Mock = jest.Mock;
import { speak } from "@silenzio/core";

global.fetch = jest.fn().mockImplementation(async () => {
  return {
    json: jest.fn(() => {
      return {
        message: "Successfully revalidated tags",
        tags: "test",
      };
    }),
  };
});

describe("Sanity revalidateCacheOnAction", () => {
  const mockOriginalAction: Mock<DocumentActionComponent> = jest.fn(() => {
    return () => ({
      onHandle: jest.fn(),
      label: "publish",
    });
  });

  // @ts-expect-error Missing props we don't need for the test
  const mockContext: DocumentActionsContext = {
    dataset: "prodution",

    projectId: "",

    documentId: "123",
    schemaType: "test",
  };

  test("is a test", () => {
    expect(true).toBe(true);
  });

  test("is a function", () => {
    expect(typeof revalidateCacheOnAction).toBe("function");
  });

  test("works properly", async () => {
    const returnedFunction = revalidateCacheOnAction(
      // @ts-expect-error Props should be DocumentActionProps
      mockOriginalAction,
      mockContext
    );

    expect(typeof returnedFunction).toBe("function");

    // @ts-expect-error Props should be DocumentActionProps
    const result = returnedFunction({});

    expect(mockOriginalAction).toBeCalled();

    await result.onHandle();

    expect(jest.mocked(global.fetch).mock.calls[0][0]).not.toHaveProperty(
      "method",
      "GET"
    );

    const requestBody: {
      document: {
        _id: string;
        _type: string;
      };
      tags: string;
      secret: string;
    } = JSON.parse(jest.mocked(global.fetch).mock.calls[0][1]?.body as string);

    expect(requestBody).not.toBeUndefined();
    expect(requestBody?.secret).not.toBeUndefined();
    expect(requestBody?.secret).not.toBeNull();
    expect(requestBody?.tags).toBe(mockContext.schemaType);

    expect(requestBody?.document?._id).toBe(mockContext.documentId);
    expect(requestBody?.document?._type).toBe(mockContext.schemaType);

    expect(global.fetch).toBeCalledTimes(
      (speak("cache.domains") as URL[]).length
    );
  });
});
