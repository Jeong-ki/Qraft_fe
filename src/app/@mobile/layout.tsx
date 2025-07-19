import '@css/m_style.scss';

export default function PcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-doc">
      <div className="doc-main">{children}</div>
    </div>
  );
}
