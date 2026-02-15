import LiquidDiv from "@/components/liquid-div"

export default function HomePage() {
  const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2070&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]

  return (
    <main className="relative bg-black">
      {/* Scrollable Background Sections */}
      {images.map((img, i) => (
        <section
          key={i}
          className="h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Liquid Glass — fixed centered via CSS */}
      <LiquidDiv />
    </main>
  )
}
