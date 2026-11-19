//src/components/PageHeader.tsx
type PageHeaderProps = {
    title: string;
    tagline?: string;
    className?: string;
};

export default function PageHeader({title, tagline, className = ""}: PageHeaderProps){
    return(
        <header className={`page-header ${className}`}>
            <h1>{title}</h1>
            {tagline && <p className="tagline">{tagline}</p>}
        </header>
    );
}