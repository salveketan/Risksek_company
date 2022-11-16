import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from './Pagination';


function BasicExample() {
    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios({
            method: "get",
            url: "https://riskrestask.herokuapp.com/data",
            params: {
                _page: page,
                _limit: 10,
            }
        })
            .then(res => {
                setData(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, [page])

    const handle = (e) => {
        axios({
            method: "get",
            url: "https://riskrestask.herokuapp.com/data",
            params: {
                _page: page,
                _limit: 10,
            }
        })
            .then((d) => {
                const array = d.data.filter((r) =>
                    r.Status.includes(e.target.value)
                );
                setData(array)
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "get",
            url: "https://riskrestask.herokuapp.com/data",
            params: {
                _page: page,
                _limit: 10,
            }
        })
            .then((d) => {
                const array = d.data.filter((r) =>
                    r.Project_Name.includes(name)
                );
                setData(array);
            });
    }

    return (
        <>
            <div style={{ display: "flex", gap: "50px", padding: "10px", marginLeft: "10%" }}>
                <div >
                    <select name="select" onClick={handle} style={{ border: "1px solid blue" }} >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Agender">Agender</option>
                        <option value="Bigender">Bigender</option>
                        <option value="Non-binary">Non-binary</option>
                    </select>
                </div>
                <div>
                    <input onChange={(e) => setName(e.target.value)} value={name} style={{ border: "1px solid blue" }}></input>
                    <button type='submit' onClick={handleSubmit} style={{ border: "1px solid blue" }}>Search</button>
                </div>
                <div style={{ display: "flex" }}>
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ border: "1px solid blue" }}>Prev</button>
                    <Pagination lastpage={5} currentPage={page} onPageChange={setPage} />
                    <button onClick={() => setPage(p => p + 1)} style={{ border: "1px solid blue" }}>Next</button>
                </div>
            </div>
            <div style={{ width: "80%", margin: "auto" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project_Name</th>
                            <th>Status</th>
                            <th>LastUpdate</th>
                            <th>Resources</th>
                            <th>ProjectTimiline</th>
                            <th>Estimation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e) =>
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.Project_Name}</td>
                                <td>{e.Status}</td>
                                <td>{e.LastUpdate}</td>
                                <td>{e.Resources}</td>
                                <td>{e.ProjectTimiline}</td>
                                <td>{e.Estimation}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default BasicExample;