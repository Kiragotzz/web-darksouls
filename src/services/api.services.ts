const ApiServices = {
  'get': async (data: any) => {
    try {
      let url = data.url
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (err) {
      return err
    }
  },
}

export default ApiServices 