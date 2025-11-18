import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState, ErrorToast, SkeletonBlock } from '../components/AsyncStates';
import { mockData } from '../data/mockData';
import { useMockedData } from '../hooks/useMockedData';

const KnowledgeArticlePage = () => {
  const { id } = useParams();
  const { data, loading, error, reload } = useMockedData(() => mockData.knowledgeArticles, { failFirst: true });
  const article = useMemo(() => data?.find((a) => a.id === id), [data, id]);

  if (loading) {
    return (
      <div className="stack">
        <article className="card">
          <SkeletonBlock width="30%" />
          <SkeletonBlock width="60%" />
          <SkeletonBlock width="90%" />
          <SkeletonBlock width="80%" />
        </article>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="stack">
        <EmptyState
          title="Article missing"
          message="We couldn't find that article."
          actionLabel="Back to knowledge"
          to="/knowledge"
        />
        <ErrorToast message={error} onRetry={reload} />
      </div>
    );
  }

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
        <Link className="primary" to="/knowledge" style={{ textDecoration: 'none', color: '#fff' }}>
          Share
        </Link>
      </article>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default KnowledgeArticlePage;
