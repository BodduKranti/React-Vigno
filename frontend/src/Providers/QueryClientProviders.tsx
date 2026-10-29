import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"


export const queryClient = new QueryClient()

const QueryClientProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default QueryClientProviders