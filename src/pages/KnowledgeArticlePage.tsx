import { useParams } from 'react-router-dom';
import { knowledgeArticles } from '../data/mockData';

const KnowledgeArticlePage = () => {
  const { id } = useParams();
  const article = knowledgeArticles.find((a) => a.id === id) ?? knowledgeArticles[0];

  return (
    <div className="stack">
      <article className="card">
        <p className="workspace">{article.category}</p>
        <h1>{article.title}</h1>
        <p>
          By {article.author} · Updated {article.lastUpdated} · {article.views} views
        </p>
        <hr />
        <p>
          This is a placeholder body describing {article.title}. Use the editor experience to capture structured
          knowledge, embed media, and manage metadata like SEO, visibility, and scheduling.
        </p>
        <p>
          Key topics include {article.tags.join(', ')}. The final product should integrate references, citations, and cross
          workspace insights.
        </p>
        <button className="primary">Share</button>
      </article>
    </div>
  );
};

export default KnowledgeArticlePage;
