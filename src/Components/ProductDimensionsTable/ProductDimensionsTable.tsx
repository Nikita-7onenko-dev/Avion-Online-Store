import styles from './productDimensionsTable.module.scss'

type Props = {
  height: number;
  width: number;
  depth: number;
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
            <td>{height}</td>
            <td>{width}</td>
            <td>{depth}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}