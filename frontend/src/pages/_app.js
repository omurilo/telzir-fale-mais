import Head from "next/head"
import { ThemeProvider } from "styled-components"

import GlobalStyles from "../styles/global"
import Theme from "../styles/theme"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <Head>
        <title>Telzir - Calculadora de ligações</title>
        <meta
          name="description"
          content="Sem surpresas na fatura, com a telzir você sabe exatamente quanto custou a sua ligação, basta ter em mãos o tempo da ligação em minutos, o DDD de origem e o DDD de destino, e claro, o plano fale mais contratado."
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}
