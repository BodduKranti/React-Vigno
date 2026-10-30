// components/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info.componentStack)
        // send to a logging service here (Sentry, etc.)
    }

    reset = () => this.setState({ hasError: false, error: null })

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="p-8 text-center">
                        <h2 className="text-xl font-semibold">Something went wrong</h2>
                        <p className="mt-1 text-zinc-500">{this.state.error?.message}</p>
                        <button onClick={this.reset} className="mt-4 rounded-full bg-[#ff6b06] px-5 py-2 text-white">
                            Try again
                        </button>
                    </div>
                )
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary