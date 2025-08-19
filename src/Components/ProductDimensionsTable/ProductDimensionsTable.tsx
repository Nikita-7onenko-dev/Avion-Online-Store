import styles from './productDimensionsTable.module.scss'

type Props = {
  height: number | null;
  width: number | null;
  depth: number | null;
}

export default function ProductDimensionsTable({height, width, depth}: Props): React.JSX.Element {


  return (
    <div className={styles.productDimensionsTable}>
      <h3>Dimensions</h3>
      <table>
        <thead>
          <tr>
            <th>Height</th>
            <th>Width</th>
            <th>Depth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{height && height}</td>
            <td>{width && width}</td>
            <td>{depth && depth }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}