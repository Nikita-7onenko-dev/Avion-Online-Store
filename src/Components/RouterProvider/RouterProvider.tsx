
import { BrowserRouter, HashRouter } from "react-router-dom";

type Props = {
  children: React.ReactNode;
}

export default function RouterProvider({children}: Props): React.JSX.Element {

  const isProd = process.env.NODE_ENV === 'production';
  console.log(process.env.NODE_ENV)

  if(isProd) {
    return (
      <HashRouter>{children}</HashRouter>
    )
  }
  
  return (
    <BrowserRouter>{children}</BrowserRouter>
  )

}