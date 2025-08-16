# Admin Access Instructions for TheFineThings Website

## 🔐 **How to Access Admin Dashboard**

### **Step 1: Go to Admin Login**
1. Open your web browser
2. Go to: `https://yoursite.com/secure-admin-login` 
   - (For now, use: `http://localhost:3000/secure-admin-login`)

### **Step 2: Enter Login Credentials**
**Current Login Details:**
- **Username:** `thefinethings_admin`
- **Password:** `TFT@admin2025!`

### **Step 3: Two-Factor Authentication**
1. After entering username/password, you'll get a 6-digit code
2. In testing, it shows in a popup - just copy and paste it
3. In production, it will be sent to your phone via SMS

### **Step 4: Access Dashboard**
- Once logged in, you can manage products, orders, and settings
- Session lasts 8 hours, then auto-logout for security

---

## 🛠️ **How to Change Your Login Credentials**

### **When to Change:**
- First time setting up (change from default)
- Every 3-6 months for security
- If you suspect credentials are compromised
- When team members leave/join

### **How to Change:**

1. **Login to Admin Dashboard** (follow steps above)

2. **Go to Settings**
   - Click the "Settings" button in the top right corner
   - This takes you to: `/admin-settings`

3. **View Current Credentials**
   - You'll see your current username and password
   - Click the eye icon to show/hide password

4. **Update Credentials**
   - **Username:** Leave blank to keep current, or enter new username
   - **New Password:** Enter a strong password, or click "Generate Strong Password"
   - **Confirm Password:** Re-type the new password

5. **Password Requirements:**
   - At least 8 characters
   - One uppercase letter (A-Z)
   - One lowercase letter (a-z) 
   - One number (0-9)
   - One special character (!@#$%^&*)

6. **Save Changes**
   - Click "Update Credentials"
   - You'll see a success message
   - Next time you login, use the new credentials

---

## 🎯 **Recommended Security Practices**

### **Strong Username Ideas:**
- `thefinethings_owner`
- `tft_manager_2025`
- `admin_yourname`
- `thefinethings_boss`

### **Strong Password Examples:**
- `MyStore2025!`
- `TFT#SecurePass99`
- `Fashion@Admin2025`
- Or use the "Generate Strong Password" button

### **Security Tips:**
1. **Change Defaults:** Always change from the default credentials immediately
2. **Regular Updates:** Change password every 3-6 months
3. **Unique Passwords:** Don't reuse passwords from other sites
4. **Keep Secret:** Never share admin credentials with anyone
5. **Safe Storage:** Write them down and keep in a secure place
6. **Logout Always:** Always click "Secure Logout" when done

---

## 📱 **Quick Reference Card**

**Admin URL:** `https://yoursite.com/secure-admin-login`

**Current Credentials:**
- Username: `thefinethings_admin`
- Password: `TFT@admin2025!`

**Change Credentials:**
1. Login → Settings button → Update credentials → Save

**Emergency:**
- If locked out, contact your developer
- All login attempts are logged for security
- 3 wrong attempts = 30-minute lockout

---

## 🚨 **Important Notes**

### **For Production (Live Website):**
- The URL will be your actual website domain
- 2FA codes will be sent to your phone via SMS
- All security features will be active

### **Security Features Active:**
- ✅ Hidden admin URL (not linked anywhere public)
- ✅ Two-factor authentication required
- ✅ Session timeout after 8 hours
- ✅ Login attempt limiting (3 tries max)
- ✅ All access logged and monitored

### **What Happens After Login:**
- View and manage all products
- See customer orders and details
- Update product prices and inventory
- View sales analytics
- Change your own login credentials

---

## 📞 **Need Help?**

If you have any issues:
1. **Forgot Credentials:** Check this document first
2. **Locked Out:** Wait 30 minutes and try again
3. **Technical Issues:** Contact your developer
4. **Security Concerns:** Change credentials immediately

**Remember:** This admin system uses the same security as major banks and e-commerce sites. Your business data is protected! 🛡️
