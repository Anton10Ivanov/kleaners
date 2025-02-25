
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => navigate('/login')}
        className="font-raleway"
      >
        Sign in
      </Button>
    </>
  );
};
