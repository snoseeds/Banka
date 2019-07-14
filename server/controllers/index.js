class Index {
  static home(req, res) {
    res.status(200).json({
      status: 200,
      message: 'You\'re Welcome to Banka APIs',
    });
  }

  static v1(req, res) {
    res.status(200).json({
      status: 200,
      message: 'You\'re Welcome to version 1 of Banka APIs',
    });
  }
}

export default Index;
