from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Временная "база данных" профиля
user_profile = {
    "name": "Иван Иванов",
    "bio": "Студент курса Python. Люблю кодить, пить кофе и автоматизировать рутину.",
    "skills": ["Python", "Flask", "Git", "HTML/CSS"],
    "avatar_url": "https://unsplash.com"
}

@app.route('/')
def index():
    # Показываем интерактивную страницу профиля
    return render_template('profile.html', profile=user_profile)

@app.route('/update', methods=['POST'])
def update_profile():
    # Получаем измененные данные из формы на сайте
    user_profile['name'] = request.form.get('name')
    user_profile['bio'] = request.form.get('bio')
    
    # Считываем навыки из строки через запятую
    skills_raw = request.form.get('skills')
    user_profile['skills'] = [s.strip() for s in skills_raw.split(',') if s.strip()]
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
