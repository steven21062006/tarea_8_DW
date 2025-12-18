import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const ListaPosts = () => {
  const { data: allPosts, loading, error } = useFetch("/api/posts");
  const { data: userList } = useFetch("/api/users");

  const [selectedUser, setSelectedUser] = useState("");

  
  const displayPosts = selectedUser 
    ? allPosts?.filter((item) => item.userId === parseInt(selectedUser)) 
    : allPosts;

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  if (loading) return <div className="loading">Cargando contenido...</div>;
  if (error) return <div className="error">Hubo un error al cargar: {error}</div>;

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h2>Publicaciones Recientes</h2>
      </header>

      <div className="filter-area">
        <label htmlFor="user-select">Buscar por autor:</label>
        <select 
          id="user-select" 
          value={selectedUser} 
          onChange={handleUserChange}
          className="custom-select"
        >
          <option value="">Mostrar todos</option>
          {userList?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-layout">
        {displayPosts?.map((item) => (
          <article key={item.id} className="card-item">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-excerpt">
              {item.body.slice(0, 90)}...
            </p>
            <Link to={`/posts/${item.id}`} className="read-more-btn">
              Continuar leyendo
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListaPosts;
