function MyTable() {
  const data = [
    {id: 1, brand: '기아' , model: '셀토스'},
    {id: 2, brand: '현대' , model: '그랜저'},
    {id: 3, brand: '아우디' , model: 'A8'}
  ];

  return(
    <>
      <table>
        <tbody>
          {
            data.map((item) => 
              <tr key={item.id}>
                <td>{item.brand} : </td> 
                <td> {item.model} </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  );
}

export default MyTable