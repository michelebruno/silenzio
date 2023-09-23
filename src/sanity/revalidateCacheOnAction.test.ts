import revalidateCacheOnAction from './revalidateCacheOnAction'
import {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  SanityClient,
  SourceClientOptions
} from "sanity";
import Mock = jest.Mock;
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import speak from "../utils/speak";

// @ts-ignore

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve()
}));


describe('Sanity revalidateCacheOnAction', () => {

  const mockOriginalAction: Mock<DocumentActionComponent> = jest.fn(() => {
    return (p) => ({
      onHandle: jest.fn(),
      label: 'publish',
    })
  })

  // @ts-ignore
  const mockContext: DocumentActionsContext = {

    dataset: "prodution",

    projectId: "",

    documentId: '123',
    schemaType: 'test'

  }

  // @ts-ignore

  test('is a test', () => {
    expect(true).toBe(true)
  })

  test('is a function', () => {
    expect(typeof revalidateCacheOnAction).toBe('function')
  })

  test('works properly', async () => {

    // @ts-ignore
    const returnedFunction = revalidateCacheOnAction(mockOriginalAction, mockContext)

    expect(typeof returnedFunction).toBe('function')

    // @ts-ignore
    const result = returnedFunction({})

    expect(mockOriginalAction).toBeCalled()

    // @ts-ignore
    await  result.onHandle()

    expect(jest.mocked(global.fetch).mock.calls[0][0]).not.toHaveProperty('method', 'GET')

    expect(global.fetch).toBeCalledTimes(speak('cache.domains').length)

  })


})