
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

function TopTitleWordsTableComponent() {
    const URL='http://127.0.0.1:8000/summary/top_title_words'
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(URL); 
          setLoading(true);
          if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const table_data = Object.values(data);

    const headers = [
      {
        name: 'COUNT',
        selector: row => row.count,
        sortable: false,
      },
      {
        name: 'WORD',
        selector: row => row.word,
        sortable: false,
      }
    ];

    return (
      <div>
      <h2>The word that occures the most in titles</h2>
      <DataTable
        columns={headers}
        data = {table_data}
      />
        
      </div>
    );
}

export default TopTitleWordsTableComponent;
