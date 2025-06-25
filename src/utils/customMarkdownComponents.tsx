const customComponents = {
    h1: ({ children }) => (
        <h1 className="text-3xl font-bold mb-6 text-gray-400 leading-tight">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-semibold mb-4 text-gray-400 leading-relaxed">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl font-medium mb-3 text-gray-400 leading-normal">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-lg font-medium mb-2 text-gray-200 leading-snug">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="mb-4 text-gray-200 leading-relaxed text-base">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="mb-4 space-y-2 pl-6">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-4 space-y-2 pl-6 list-decimal ">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-gray-400 list-disc leading-relaxed marker:text-gray-400">
            {children}
        </li>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold ">
            {children}
        </strong>
    ),
    em: ({ children }) => (
        <em className="italic text-gray-200">
            {children}
        </em>
    ),
    code: ({ children }) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-400">
            {children}
        </code>
    ),
    pre: ({ children }) => (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
            {children}
        </pre>
    )
};

export {customComponents};