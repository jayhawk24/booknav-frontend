import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
//
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import 'rc-slider/assets/index.css'
// STYLE
import './styles/index.scss'
import './index.css'
import './fonts/line-awesome-1.3.0/css/line-awesome.css'

//
import App from './App'
import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </StrictMode>,

  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
