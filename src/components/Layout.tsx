import styles from './Layout.module.css'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
