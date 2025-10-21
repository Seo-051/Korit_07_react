import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Repositories() {
  const getGerepositories = async () => {
    const response = await axios.get('https://api.github.com/search/repositories?q=korit_07');
    return response.data.items;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['repositories'],
    queryFn: getGerepositories,
    staleTime: 60 * 1000, // 1분을 의미
  })

  if(isLoading) {
    return <h1>Loading ... 🔮</h1>
  }

  if(isError) {
    return <h1>오류가 발생했습니다... 😱</h1>
  }
  else {
    return (
      <table>
        <tbody>
          {
            data.map(repo => 
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

export default Repositories