import styles from "@/src/components/common/CardStack.module.css";

const images = [
  "/images/events/1.png",
  "/images/events/2.png",
  "/images/events/3.png",
  "/images/events/4.png",
  "/images/events/5.png",
  "/images/events/6.png",
  "/images/events/7.png",
];
export default function CardStack() {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>IEEE CS</h1>

      <div className={styles.cards}>
        {images.map((src, index) => (
          <div key={index} className={styles.card}>
            <img
              src={src}
              alt={`card-${index}`}
              loading="eager"
              decoding="async"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                display: "block"
              }}
            />
          </div>
        ))}
      </div>    </section>
  );
}
