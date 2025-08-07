import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Connect. Chat. Collaborate.
            </h2>
            <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                Real-time messaging for you and your teams. Fast, secure, and beautifully designed.
            </p>
            <Button className="py-3" onClick={() => navigate('/sign-in')}>
                Get Started
            </Button>
        </>
    )
}

export default LandingPage