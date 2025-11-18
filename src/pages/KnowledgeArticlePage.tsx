import { Link, useParams } from 'react-router-dom';
import { FiBookOpen } from 'react-icons/fi';
import { knowledgeArticles } from '../data/mockData';

const KnowledgeArticlePage = () => {
  const { id } = useParams();
  const article = knowledgeArticles.find((a) => a.id === id) ?? knowledgeArticles[0];
  const related = knowledgeArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  const tableOfContents = ['Overview', 'Key Findings', 'Operational Guidance', 'Risks', 'References'];

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <p className="workspace">Knowledge Article</p>
          <h1 style={{ margin: 0 }}>{article.title}</h1>
          <p style={{ margin: '0.3rem 0', color: '#4b5563' }}>
            {article.category} · {article.type} · {article.readingTime}
          </p>
        </div>
        <div className="pill-row">
          <button className="ghost">Share</button>
          <button className="ghost">Export PDF</button>
          <button className="primary">Edit</button>
        </div>
      </div>

      <section className="grid-two">
        <article className="card stack">
          <div className="meta-row">
            <span>By {article.author}</span>
            <span>Updated {article.lastUpdated}</span>
            <span>{article.views} views</span>
          </div>

          <div className="pill-row">
            {article.tags.map((tag) => (
              <span key={tag} className="badge info">
                {tag}
              </span>
            ))}
          </div>

          <div className="toc">
            <p className="workspace" style={{ margin: 0 }}>
              Table of contents
            </p>
            {tableOfContents.map((entry) => (
              <div key={entry} className="toc-row">
                <span className="icon" aria-hidden>
                  •
                </span>
                <span>{entry}</span>
              </div>
            ))}
          </div>

          <p>
            This is a placeholder body describing {article.title}. Use the editor experience to capture structured
            knowledge, embed media, and manage metadata like SEO, visibility, and scheduling.
          </p>
          <p>
            Key topics include {article.tags.join(', ')}. The final product should integrate references, citations, and cross
            workspace insights.
          </p>

          <div className="card light">
            <p style={{ margin: '0 0 0.25rem' }}>Related resources</p>
            <ul>
              <li>Link to governance template</li>
              <li>Workflow entry point for this pattern</li>
              <li>Data sources referenced in analysis</li>
            </ul>
          </div>

          <div className="comment-placeholder">
            <p style={{ margin: '0 0 0.5rem' }}>Comments</p>
            <textarea className="input" placeholder="Commenting available in connected knowledge service" disabled />
            <p className="workspace" style={{ margin: '0.35rem 0 0' }}>
              Discussion mirrored from workspace threads.
            </p>
          </div>
        </article>

        <aside className="stack">
          <div className="card">
            <p className="workspace" style={{ margin: 0 }}>
              Metadata
            </p>
            <div className="meta-list">
              <div className="meta-row">
                <span>Visibility</span>
                <span className="badge">Workspace</span>
              </div>
              <div className="meta-row">
                <span>Published</span>
                <span>{article.publishedOn}</span>
              </div>
              <div className="meta-row">
                <span>Review cadence</span>
                <span>30 days</span>
              </div>
              <div className="meta-row">
                <span>SEO summary</span>
                <span>Compliant AI policy briefing</span>
              </div>
            </div>
          </div>

          <div className="card">
            <p className="workspace" style={{ margin: 0 }}>
              Related articles
            </p>
            <div className="timeline">
              {related.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="icon" aria-hidden>
                    <FiBookOpen size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0 }}>{item.title}</p>
                    <p className="workspace" style={{ margin: 0 }}>
                      {item.category} · {item.lastUpdated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default KnowledgeArticlePage;
