import styles from './PageIntro.module.css'

type PageIntroProps = {
  title: string
  description: string
}

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className={styles.card}>
      <p className={styles.kicker}>Coming Soon</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  )
}
