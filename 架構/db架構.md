Postgres
//全駝峰

user:
    id,username,first_ name,last name,telephone

user_info:
    id,seller_id,phone,address

seller:
    id,user_id,name,account,password,status

buyer:
    id,user_id,name,account,password,status

member:
    id,user_id,name,account,password,type,status


=================================================

brand:
    id,name

category:
    id,name,belong_to

brand_category
    id,brand_id,category_id

=================================================

product
    id,name,desc,price,has_variant,saleStatus

product_variant
    id,product_id,name,price,qty,img_url,status

product_info:
    id,product_id,category_id,sub_category_id,brand_id,seller_id,img_url

product_sell_status
    id,product_id,qty,selling_mode,shipping_method,group_by_lower_qty,group_by_upper_qty,group_buy_end
    _data,notice



=================================================

discount
    id,name,desc,discount_percent,active,status,start_data,end_date,deleted_at

coupon
    id,

=================================================

shopping_session
    id,user_id,total

cart_item
    id,shopping_session_id,product_variant_id,quantity

order
    id,user_id,total,payment_id,shipping_id

order_item
    id,order_id,product_variant_id,quantity


=================================================

shipping
    id,type,name,



mongo
