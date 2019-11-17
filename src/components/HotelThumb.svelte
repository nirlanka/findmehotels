<script>
    import DomPurify from 'dompurify';
    
    export let data;

    const _address = data.address.split(',');
    const _addressLen = _address.length;
    const shortAddress = [_address[_addressLen-2], _address[_addressLen-1]].join(',');
</script>

<h3>{data.name}</h3>
<p>{data.rating}/10 - {data.stars}/5</p>
<p>{shortAddress}</p>