export const createSession = async(req, res, next) => {
    try{
        req.session.user = req.user;
        res.redirect("http://localhost:8080/products")
       }catch(err){ 
        next(err) 
    }

}
export const logoutUser = async(req, res, next) => {
    try{
        req.session.destroy()
        res.redirect("http://localhost:8080/login")
    } catch(err){
        next(err);
    }
}

export const currentSession = async (req, res, next) => {
    try {
      if (req.session && req.session.user) {
        return res.json(req.session.user);
      } else {
        return res.status(400).json({ error: 'No current session' });
      }
    } catch (err) {
      next(err);
    }
  };
  