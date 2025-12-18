import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const DetallePost = () => {
  const { id } = useParams();

  
  const { data: postDetail, loading: isLoading, error: fetchError } = useFetch(`/api/posts/${id}`);

  
  const userEndpoint = postDetail ? `/api/users/${postDetail.userId}` : null;
  const { data: author } = useFetch(userEndpoint);

  // Manejo de estados de carga y error unificados
  if (isLoading) return <div className="status-msg">Obteniendo información...</div>;
  if (fetchError) return <div className="error-msg">Ocurrió un problema: {fetchError}</div>;
  if (!postDetail) return <div className="status-msg">Post no encontrado.</div>;

  return (
    <article className="post-container">
      <nav className="nav-back">
        <Link to="/" className="btn-back">
          &laquo; Regresar al listado
        </Link>
      </nav>

      <header className="post-header">
        <h1>{postDetail.title}</h1>
      </header>

      <section className="post-content">
        <p>{postDetail.body}</p>
      </section>

      <hr className="divider" />

      
      {author ? (
        <footer className="author-box">
          <h4>Sobre el autor:</h4>
          <ul className="author-details">
            <li><strong>Nombre:</strong> {author.name}</li>
            <li><strong>Contacto:</strong> {author.email}</li>
            <li><strong>Alias:</strong> @{author.username}</li>
          </ul>
        </footer>
      ) : (
        <p className="loading-text">Cargando datos del autor...</p>
      )}
    </article>
  );
};

export default DetallePost;
