import styles from './SplashScreen.module.css';

const SplashScreen = () => {
    const letters = ['G', 'R', 'É', 'G', 'O', 'I', 'R', 'E'];

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className={styles.letter}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default SplashScreen;
