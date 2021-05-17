import React from 'react'
import { GenomWrapper } from './GenomWrapper'

interface Props {
    
}

const SecondPage = (props: Props) => {
    return (
        <div>
            <GenomWrapper nodeDataArray={[
          { key: 0, n: "Father", s: "M", m:7, f:8, ux: 4, a: ["C", "F", "K"] },
          { key: 1, n: "Mother", s: "F", m:9, f:10, vir: [0, 5], a: ["B", "H", "K"] },
          { key: 5, n: "Mother's Spouse", s: "M", a: ["C"] },
          { key: 6, n: "Maternal Halfbrother", s: "M", m: 1, f: 5, a: ["C"] },
          { key: 4, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
          { key: 12, n: "Baby", s: "F", m: 4, f: 0, a: ["C"] },
          { key: 13, n: "Baby2", s: "F", m: 4, f: 0, a: ["C"] },
          // ancestors
          { key: 7, n: "Paternal Grandfather", s: "M", m: -33, f: -32, ux: 8, a: ["A", "S"] },
          { key: 8, n: "Paternal Grandmother", s: "F", a: ["E", "S"] },
        ]}  selectedKey={12} />
        </div>
    )
}

export default SecondPage
