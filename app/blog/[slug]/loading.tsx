export default function BlogPostLoading() {
  return (
    <div
      style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '48px 40px 80px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        gap: '40px',
      }}
    >
      <div>
        {/* Back link skeleton */}
        <div
          style={{
            width: '120px',
            height: '14px',
            background: '#efefed',
            borderRadius: '4px',
            marginBottom: '28px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        {/* Category skeleton */}
        <div
          style={{
            width: '80px',
            height: '12px',
            background: '#efefed',
            borderRadius: '4px',
            marginBottom: '16px',
          }}
        />
        {/* Title skeleton */}
        <div
          style={{
            width: '90%',
            height: '48px',
            background: '#efefed',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        />
        <div
          style={{
            width: '70%',
            height: '48px',
            background: '#efefed',
            borderRadius: '6px',
            marginBottom: '32px',
          }}
        />
        {/* Image skeleton */}
        <div
          style={{
            width: '100%',
            height: '400px',
            background: '#efefed',
            borderRadius: '12px',
            marginBottom: '40px',
          }}
        />
        {/* Content skeletons */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i % 3 === 2 ? '75%' : '100%',
              height: '18px',
              background: '#efefed',
              borderRadius: '4px',
              marginBottom: '14px',
            }}
          />
        ))}
      </div>
      <div />
    </div>
  )
}
