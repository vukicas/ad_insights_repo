import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

function MaxTitleWordsTableComponent() {
    const URL='http://127.0.0.1:8000/summary/max_title_words'
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(URL); 
          console.log(response);
          setLoading(true);
          if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          console.log(result);
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
        name: 'USER ID',
        selector: row => row.userId,
        width: "80px",
        sortable: false,
      },
      {
        name: 'POST ID',
        width: "80px",
        selector: row => row.id,
        sortable: false,
      },
      {
        name: 'TITLE',
        width: "200px",
        selector: row => row.title,
        sortable: false,
      },
      {
        name: 'BODY',
        width: "200px",
        selector: row => row.body,
        sortable: false,
      },
      {
        name: 'WORD COUNT',
        width: "160px",
        selector: row => row.word_count,
        sortable: false,
      }
    ];

    return (
      <div>
      <h2>Words that appears the most in titlts</h2>
      <DataTable
        columns={headers}
        data = {table_data}
      />
        
      </div>
    );
}

export default MaxTitleWordsTableComponent;
