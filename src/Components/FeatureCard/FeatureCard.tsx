import styles from './featureCard.module.scss'

type Props = {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export default function FeatureCard({icon, title, text }: Props): React.JSX.Element {

  return (
    <div className={styles.featureCard}>
      {icon}
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  )
}