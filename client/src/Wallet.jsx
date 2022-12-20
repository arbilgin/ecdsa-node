import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';

import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, publicKey, setPublicKey }) {
  async function onChange(evt) {
    const publicKey = evt.target.value;
    setPublicKey(publicKey);
    const address = toHex(secp.getPublicKey(publicKey));
    setAddress(address);
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key:
        <input placeholder="Type in a public key" value={publicKey} onChange={onChange}></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
