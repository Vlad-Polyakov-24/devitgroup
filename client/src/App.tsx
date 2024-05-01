import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Form from './components/Form/Form.tsx';
import List from './components/List/List.tsx';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
    const [data, setData] = useState<string[]>([]);
    const [error, setError] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(async (inputValue: number) => {
        setData([]);
        setIsFetching(true);
        const totalRequests = 1000;
        let activeRequests = 0;
        let requestIndex = 0;

        const sendRequest = async (index: number) => {
            try {
                const { data } = await axios.get('http://localhost:3000/api', { params: { index } });
                setData(prev => [...prev, data]);
            } catch (e) {
                if (e instanceof AxiosError) {
                    const ErrMessage = `${e.response?.data} - Error ${e.response?.status}, ${e.response?.statusText}`;
                    setError(prev => [...prev, ErrMessage]);
                    console.error(e.message);
                }
            } finally {
                activeRequests--;
            }
        };

        while (requestIndex < totalRequests) {
            if (activeRequests < inputValue) {
                activeRequests++;
                sendRequest(++requestIndex);
            } else {
                await wait(3000);
            }
        }

        setIsFetching(false);
    }, []);

    return (
      <div className='app'>
          <h1 className='h1'>Client - Server task</h1>
          <Form isFetching={ isFetching } onSubmit={ fetchData }/>
          <div className='row'>
              <List data={ data }/>
              { error.length > 0 && <List data={ error }/> }
          </div>
      </div>
  )
}

export default App
